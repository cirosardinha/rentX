import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
	compareInHours(start_date: Date, end_date: Date): number {
		const end_date_utc = this.convertToUTC(end_date);
		const start_date_utc = this.convertToUTC(start_date);

		return dayjs(end_date_utc).diff(start_date_utc, "hours");
	}

	compareInDays(start_date: Date, end_date: Date): number {
		const end_date_utc = this.convertToUTC(end_date);
		const start_date_utc = this.convertToUTC(start_date);

		return dayjs(end_date_utc).diff(start_date_utc, "days");
	}

	compareIfBefore(start_date: Date, end_date: Date): boolean {
		return dayjs(start_date).isBefore(end_date);
	}
	convertToUTC(date: Date): string {
		return dayjs(date).utc().local().format();
	}

	dateNow(): Date {
		return dayjs().toDate();
	}

	addDays(days: number): Date {
		return dayjs().add(days, "days").toDate();
	}

	addHours(hours: number): Date {
		return dayjs().add(hours, "hour").toDate();
	}
}
