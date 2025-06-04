import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller({
  path: 'uploads',
  version: '1',
})
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const base64 = file.buffer.toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + base64;
    const url = await this.cloudinaryService.uploadImage(dataURI);

    return {
      url,
    };
  }
}
