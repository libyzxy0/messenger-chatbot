const admin = require('firebase-admin');
const sA = require('./serviceAccountKey.json');
admin.initializeApp({
	credential: admin.credential.cert(sA),
	databaseURL: process.env.DB_URL
});
const db = admin.database();

function writeData(path, obj) {
	return new Promise((resolve, reject) => {
		const ref = db.ref(path);
		ref.push(obj).then((snapshot) => {
			resolve({
				msg: "success",
				method: "write"
			});
		}).catch((error) => {
			reject({
				msg: "error",
				method: "write"
			});
		});
	});
}

function readData(path) {
	return new Promise((resolve, reject) => {
		const ref = db.ref(path);
		ref.once('value', (snapshot) => {
			const data = snapshot.val();
			if(data) {
				let dataArray = [];
				snapshot.forEach((childSnapshot) => {
					const childData = childSnapshot.val();
					childData["fid"] = childSnapshot.key;
					dataArray.push(childData)
				});
				resolve(dataArray);
			}
		}).catch((error) => {
			reject({
				msg: "error",
				method: "read"
			});
		});
	});
}

function updateData(path, obj) {
	return new Promise((resolve, reject) => {
		const ref = db.ref(path);
		ref.update(obj).then(() => {
			resolve({
				msg: "success",
				method: "update"
			});
		}).catch((error) => {
			reject({
				msg: "error",
				method: "update"
			});
		});
	});
}

function removeData(path) {
	return new Promise((resolve, reject) => {
		const ref = db.ref(path);
		ref.remove().then(() => {
			resolve({
				msg: "success",
				method: "remove"
			});
		}).catch((error) => {
		resolve({
				msg: "error",
				method: "remove"
			});
		});
	});
}
module.exports = {
	writeData, readData, updateData, removeData
        }