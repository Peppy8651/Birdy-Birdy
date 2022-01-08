/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */

module.exports = {
	name: 'status',
	description: 'status function that you can reload to update Birdy7\'s status',
	fetchStatus() {
		const activityupdate = null;
		const activityname = '>help';
		const BirdyActivity = activityupdate == undefined ? `${activityname}` : activityupdate == null ? `${activityname}` : `${activityname} | ${activityupdate}`;
		return BirdyActivity;
	},
};