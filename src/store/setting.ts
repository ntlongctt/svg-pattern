import { Observable, observable } from "@legendapp/state";

const $setting = observable({
	row: 3,
	col: 4,
});

export { $setting };
