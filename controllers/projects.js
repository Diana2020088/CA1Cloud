const projects = require('../models/projects.js')();

module.exports = () => {
	const getController = async (req, res) => {
		const { projectsList, error } = await projects.get();
		if (error) {
			return res.status(500).json({ error });
		}
		res.json({ projects: projectsList });
	};

	const populatedController = async (req, res) => {
		res.json(await projects.aggregateWithIssues(req.params.slug));
	};

	const getBySlug = async (req, res) => {
		res.json(await projects.get(req.params.slug));
	};

	const postController = async (req, res) => {
		const slug = req.body.slug;
		const name = req.body.name;
		const description = req.body.description;
		const { result, error } = await projects.add(slug, name, description);
		if (error) {
			res.status(400).json(error);
		}
		res.json(result);
	};
	return {
		getController,
		postController,
		getBySlug,
		populatedController,
	};
};
