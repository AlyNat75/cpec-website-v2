// usage: swift scripts/trim-logo.swift <in> <out.png>
// Crops near-white margins around a logo (keeps 4% padding) onto a white canvas.
import AppKit
import CoreImage
let a = CommandLine.arguments
let ci = CIImage(contentsOf: URL(fileURLWithPath: a[1]))!
let cg = CIContext().createCGImage(ci, from: ci.extent, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)!
let w = cg.width, h = cg.height
var px = [UInt8](repeating: 0, count: w * h * 4)
let bc = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
bc.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1)); bc.fill(CGRect(x: 0, y: 0, width: w, height: h))
bc.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
var minX = w, minY = h, maxX = -1, maxY = -1
for y in 0..<h { for x in 0..<w { let i = (y * w + x) * 4
  if px[i] < 230 || px[i+1] < 230 || px[i+2] < 230 { minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } } }
let pad = Int(Double(max(maxX - minX, maxY - minY)) * 0.04)
let x0 = max(0, minX - pad), y0 = max(0, minY - pad), x1 = min(w, maxX + pad + 1), y1 = min(h, maxY + pad + 1)
let out = bc.makeImage()!.cropping(to: CGRect(x: x0, y: y0, width: x1 - x0, height: y1 - y0))!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, "public.png" as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, nil); CGImageDestinationFinalize(dest)
print(x1 - x0, y1 - y0)
