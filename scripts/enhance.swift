// usage: swift scripts/enhance.swift <in> <out.jpg> <scale>
// Upscales with Lanczos, then applies light sharpening and noise reduction.
import AppKit
import CoreImage
let a = CommandLine.arguments
let k = Double(a[3])!
var img = CIImage(contentsOf: URL(fileURLWithPath: a[1]))!
img = img.applyingFilter("CILanczosScaleTransform", parameters: [kCIInputScaleKey: k, kCIInputAspectRatioKey: 1.0])
img = img.applyingFilter("CINoiseReduction", parameters: ["inputNoiseLevel": 0.015, "inputSharpness": 0.5])
img = img.applyingFilter("CIUnsharpMask", parameters: [kCIInputRadiusKey: 1.6, kCIInputIntensityKey: 0.45])
try! CIContext().writeJPEGRepresentation(of: img, to: URL(fileURLWithPath: a[2]), colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!, options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.93])
