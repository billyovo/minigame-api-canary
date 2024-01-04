import { RRule } from "rrule";
import { DateTime } from "luxon";
import { EventData, EventScheduleItem } from "src/shared/types/event";

export function getOccurrencFromRRuleString(fromDate: Date, rrule: string) : Date {
	const rule : RRule = RRule.fromString(rrule);

	// no dtstart will generate bad date!
	// https://github.com/jkbrzt/rrule/issues/428
	rule.options.dtstart = fromDate;
	const fromDateUTC : Date = DateTime.fromJSDate(fromDate).plus({ hours: 8 }).toJSDate();

	const nextOccurrence : Date = rule.after(fromDateUTC, true) as Date;
	// by pass the timezone bug in rrule by substracting, very smart.
	return DateTime.fromJSDate(nextOccurrence).minus({ hours: 8 }).set({ millisecond: 0 }).toJSDate();
}

export function generateSchedule(fromDate: Date, schedule: EventData[] = []) : Map<string, EventScheduleItem> {
    const output = new Map<string, EventScheduleItem>();

	for (const event of schedule) {
		const nextOccurrence : Date = getOccurrencFromRRuleString(fromDate, event.rrule);
		const eventScheduleItem : EventScheduleItem = {
			title: event.title,
			id: event.id,
			emote: event.emote,
			nextOccurrence: nextOccurrence,
		};

		output.set(eventScheduleItem.id, eventScheduleItem);
	}

	return output;
}
