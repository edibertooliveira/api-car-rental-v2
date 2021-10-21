import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { BAD_REQUEST_RESPONSE } from './constants/response';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  private fileFilter(_req: any, file: any, cb: any) {
    if (file.mimetype.match(/\/(csv)$/)) {
      return cb(null, true);
    }
    cb(
      new BadRequestException(
        `${BAD_REQUEST_RESPONSE}: type extension ${extname(file.originalname)}`,
      ),
      false,
    );
  }

  private destination(_req: any, _file: any, cb: any) {
    const uploadPath = './database';
    if (!existsSync(uploadPath)) mkdirSync(uploadPath);
    cb(null, uploadPath);
  }

  private filename(_req: any, file: any, cb: any) {
    const fileHash = new Date();
    const extension = file.mimetype.split('/')[1];
    cb(null, `${fileHash}.${extension}`);
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      fileFilter: this.fileFilter,
      storage: diskStorage({
        destination: this.destination,
        filename: this.filename,
      }),
      limits: {
        fileSize: 5242880, // 5MB
      },
    };
  }
}
