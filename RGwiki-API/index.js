const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore({
	projectId: "calcium-ratio-249108",
	keyFilename: "My First Project-421c58cf6a90.json"
});
const query = datastore.createQuery("docs");

const cors = require("cors")({
	origin: true
});

exports.getData = function(req, res) {
	cors(req, res, () => {
		datastore
			.runQuery(query)
			.then(data => {
				res.status(200)
					.status(200)
					.send(
						data[0].map(x => {
							x._id = x[datastore.KEY].id;
							return x;
						})
					);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});
};

exports.updateData = function(req, res) {
	cors(req, res, () => {
		let updateData = req.body.data;
		let id = updateData._id;
		let key;
		if (!id) {
			key = datastore.key("docs");
		} else {
			key = datastore.key(["docs", datastore.int(id)]);
			delete updateData._id;
		}
		datastore
			.upsert({
				key: key,
				excludeFromIndexes: ["content"],
				data: updateData
			})
			.then(_ => {
				res.status(200).send({ result: true });
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});
};
