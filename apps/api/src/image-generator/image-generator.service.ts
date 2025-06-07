import { Injectable } from '@nestjs/common';
import { createCanvas, CanvasRenderingContext2D } from 'canvas';
import * as crypto from 'crypto';

@Injectable()
export class ImageGeneratorService {
  generateCertificateImage(name: string, missionTitle: string): Buffer {
    const width = 1024;
    const height = 1024;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Create deterministic gradient based on name
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const [color1, color2] = this.generateColorPair(name + missionTitle);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Rounded border
    const borderRadius = 30;
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    this.roundedRect(ctx, 20, 20, width - 40, height - 40, borderRadius);
    ctx.stroke();

    // Title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎓 Certificate of Completion', width / 2, 150);

    // Mission title
    ctx.font = 'bold 36px Arial';
    ctx.fillText(missionTitle, width / 2, 250);

   
    return canvas.toBuffer('image/png');
  }

  private generateColorPair(input: string): [string, string] {
    const hash = crypto.createHash('md5').update(input).digest('hex');
    const h1 = parseInt(hash.slice(0, 6), 16) % 360;
    const h2 = parseInt(hash.slice(6, 12), 16) % 360;
    return [`hsl(${h1}, 70%, 50%)`, `hsl(${h2}, 70%, 40%)`];
  }

  private roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}
