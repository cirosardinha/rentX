import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
	async saveFile(file: string, folder: string): Promise<string> {
		const folderPath = resolve(upload.tmpFolder, folder);

		await fs.promises.mkdir(folderPath, { recursive: true });

		await fs.promises.rename(
			resolve(upload.tmpFolder, file),
			resolve(folderPath, file)
		);

		return file;
	}
	async deleteFile(file: string, folder: string): Promise<void> {
		const filename = resolve(upload.tmpFolder, file);

		try {
			await fs.promises.unlink(filename);
		} catch {
			return;
		}
	}
}
