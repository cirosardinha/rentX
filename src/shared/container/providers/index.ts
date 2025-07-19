import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { CloudinaryStorageProvider } from "./StorageProvider/implementations/CloudinaryStorageProvider";

container.registerSingleton<IDateProvider>(
	"DayjsDateProvider",
	DayjsDateProvider
);

container.registerInstance<IMailProvider>(
	"EtherealMailProvider",
	new EtherealMailProvider()
);

const diskStorage = {
	local: LocalStorageProvider,
	cloudinary: CloudinaryStorageProvider,
};

container.registerSingleton<IStorageProvider>(
	"StorageProvider",
	diskStorage[process.env.disk as keyof typeof diskStorage]
);
