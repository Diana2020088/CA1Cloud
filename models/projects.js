const db = require('../db')();
const COLLECTION = 'projects';
const LOOKUP_ISSUES_PIPELINE = {
	$lookup: {
		from: 'issues',
		localField: '_id',
		foreignField: 'project_id',
		as: 'All the issues',
	},
};

module.exports = () => {
	const get = async (slug = null) => {
		console.log('inside projects model');
		if (!slug) {
			try {
				const projects = await db.get(COLLECTION);
				console.log(projects);
				return { projectsList: projects };
			} catch (ex) {
				console.log('-=-=-=-= PROJECTS GET ERROR');
				return { error: ex };
			}
		}
		try {
			const project = await db.get(COLLECTION, { slug });
			return { projectsList: projects };
		} catch (ex) {
			return { error: ex };
		}
	};

	const add = async (slug, name, description) => {
		if (!slug || !name || !description) {
			return { error: 'All the fields have to be fill' };
		}
		const check = await db.get(COLLECTION, { slug });
		if (check.length === 0) {
			const results = await db.add(COLLECTION, {
				slug: slug,
				name: name,
				description: description,
			});
			return results.result;
		} else {
			return { error: 'This project already exists' };
		}
	};

	const aggregateWithIssues = async (slug = null) => {
		if (!slug) {
			const projects = await db.aggregate(COLLECTION, [LOOKUP_ISSUES_PIPELINE]);
			return projects;
		}
		const projects = await db.aggregate(COLLECTION, [
			{ $match: { slug: slug } },
			LOOKUP_ISSUES_PIPELINE,
		]);
		return projects;
	};

	return {
		get,
		add,
		aggregateWithIssues,
	};
};
