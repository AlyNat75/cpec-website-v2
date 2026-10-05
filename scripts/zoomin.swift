// usage: swift zoomin.swift <in> <out.jpg> <target face share> [x shift]
// x shift: fraction of the crop width to move the person right (negative = left)
// Crops a 4:5 window so the face fills <target> of the width, face centred
// horizontally and ~38% from the top. Only ever zooms in; never extends the photo.
import AppKit
import CoreImage
import Vision
let a = CommandLine.arguments
let target = Double(a[3])!
let shift = a.count > 4 ? Double(a[4])! : 0
let cg = NSImage(contentsOfFile: a[1])!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
let req = VNDetectFaceRectanglesRequest(); try! VNImageRequestHandler(cgImage: cg).perform([req])
let face = (req.results ?? []).max(by: { $0.boundingBox.width < $1.boundingBox.width })!.boundingBox
let W = Double(cg.width), H = Double(cg.height)
var cw = face.width * W / target, ch = cw * 1.25
if cw > min(W, H * 0.8) { cw = min(W, H * 0.8); ch = cw * 1.25 }   // already tight enough: widest 4:5 that fits
// CoreImage origin is bottom-left; face.midY is from the bottom
var x = face.midX * W - cw / 2 - shift * cw
var yTop = (1 - face.midY) * H - ch * 0.38                          // distance from top of image
x = min(max(x, 0), W - cw); yTop = min(max(yTop, 0), H - ch)
let rect = CGRect(x: x, y: H - yTop - ch, width: cw, height: ch)
let scale = min(1.0, 1200.0 / ch)                                   // cap at 960x1200
let out = CIImage(cgImage: cg).cropped(to: rect)
  .transformed(by: CGAffineTransform(translationX: -rect.minX, y: -rect.minY))
  .transformed(by: CGAffineTransform(scaleX: scale, y: scale))
try! CIContext().writeJPEGRepresentation(of: out, to: URL(fileURLWithPath: a[2]), colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.88])
print(Int(cw * scale), Int(ch * scale))
