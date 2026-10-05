// usage: swift place.swift <person> <background> <out.jpg> <face share> <max face center from top>
// Cuts the person out and places them on a softened background in a 960x1200 card:
// face sized to <share> of the width and centred; shoulders anchored to the bottom edge,
// scaling up further if needed so the face sits no lower than <max face center>.
import AppKit
import CoreImage
import Vision
let a = CommandLine.arguments
let share = Double(a[4])!, maxCy = Double(a[5])!
let OW = 960.0, OH = 1200.0
let pcg = NSImage(contentsOfFile: a[1])!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
let person = CIImage(cgImage: pcg)
let PW = person.extent.width, PH = person.extent.height
let fr = VNDetectFaceRectanglesRequest(); try! VNImageRequestHandler(cgImage: pcg).perform([fr])
let face = (fr.results ?? []).max(by: { $0.boundingBox.width < $1.boundingBox.width })!.boundingBox
let seg = VNGeneratePersonSegmentationRequest(); seg.qualityLevel = .accurate; seg.outputPixelFormat = kCVPixelFormatType_OneComponent8
try! VNImageRequestHandler(cgImage: pcg).perform([seg])
var mask = CIImage(cvPixelBuffer: seg.results!.first!.pixelBuffer)
mask = mask.transformed(by: CGAffineTransform(scaleX: PW / mask.extent.width, y: PH / mask.extent.height)).applyingGaussianBlur(sigma: 1.5).cropped(to: person.extent)
// scale: face share, but large enough that bottom-anchored face centre is <= maxCy from top
var k = share * OW / (face.width * PW)
let faceFromBottom = face.midY * PH                      // CoreImage: y measured from bottom
if (OH - faceFromBottom * k) / OH > maxCy { k = (1 - maxCy) * OH / faceFromBottom }
let tx = OW / 2 - face.midX * PW * k
let cut = person.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: CIImage(color: .clear).cropped(to: person.extent), kCIInputMaskImageKey: mask])
  .transformed(by: CGAffineTransform(scaleX: k, y: k)).transformed(by: CGAffineTransform(translationX: tx, y: 0))
// background: cover-fit to 960x1200 and soften like a shallow depth of field
var bg = CIImage(contentsOf: URL(fileURLWithPath: a[2]))!
let bs = max(OW / bg.extent.width, OH / bg.extent.height)
bg = bg.transformed(by: CGAffineTransform(scaleX: bs, y: bs))
bg = bg.transformed(by: CGAffineTransform(translationX: (OW - bg.extent.width) / 2 - bg.extent.minX, y: (OH - bg.extent.height) / 2 - bg.extent.minY))
bg = bg.clampedToExtent().applyingGaussianBlur(sigma: 9).cropped(to: CGRect(x: 0, y: 0, width: OW, height: OH))
let out = cut.composited(over: bg).cropped(to: CGRect(x: 0, y: 0, width: OW, height: OH))
try! CIContext().writeJPEGRepresentation(of: out, to: URL(fileURLWithPath: a[3]), colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.88])
print(String(format: "scale %.2f  face share %.2f  face centre %.2f from top", k, face.width * PW * k / OW, (OH - faceFromBottom * k) / OH))
