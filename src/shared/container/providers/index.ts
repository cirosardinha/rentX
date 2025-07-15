import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

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
};

container.registerSingleton<IStorageProvider>(
	"StorageProvider",
	diskStorage[process.env.disk as keyof typeof diskStorage]
);
