import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { CloudinaryStorageProvider } from "./StorageProvider/implementations/CloudinaryStorageProvider";
import { AppError } from "@shared/errors/AppError";

container.registerSingleton<IDateProvider>(
	"DayjsDateProvider",
	DayjsDateProvider
);

container.registerInstance<IMailProvider>(
	"EtherealMailProvider",
	new EtherealMailProvider()
);

const storageProviders = {
	local: LocalStorageProvider,
	cloudinary: CloudinaryStorageProvider,
};

const driver = process.env.STORAGE_DRIVER || "local";
const provider = storageProviders[driver as keyof typeof storageProviders];

if (!provider) {
	throw new AppError(`Storage provider "${driver}" is not supported.`);
}

container.registerSingleton<IStorageProvider>(
	"StorageProvider",
	provider
);
