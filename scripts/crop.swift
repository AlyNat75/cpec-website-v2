// usage: swift scripts/crop.swift <in> <out.jpg> <x> <y> <w> <h>   (pixels, origin top-left)
import AppKit
import CoreImage
let a = CommandLine.arguments
let img = CIImage(contentsOf: URL(fileURLWithPath: a[1]))!
let (x, y, w, h) = (Double(a[3])!, Double(a[4])!, Double(a[5])!, Double(a[6])!)
let r = CGRect(x: x, y: img.extent.height - y - h, width: w, height: h)  // CoreImage origin is bottom-left
let out = img.cropped(to: r).transformed(by: CGAffineTransform(translationX: -r.minX, y: -r.minY))
try! CIContext().writeJPEGRepresentation(of: out, to: URL(fileURLWithPath: a[2]), colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.88])
print(Int(w), Int(h))
