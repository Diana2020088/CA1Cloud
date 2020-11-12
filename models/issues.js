const db = require('../db')();
const ObjectId = require('mongodb').ObjectId;
const COLLECTION = 'issues';
const comm = { comments: 1 };

module.exports = () => {
	const get = async (issueNumber = null) => {
		console.log('inside issues model');
		if (!issueNumber) {
			try {
				const issues = await db.get(COLLECTION);
				console.log(issues);
				return { issuesList: issues };
			} catch (ex) {
				console.log('+-+-+-+-+-+-+- ISSUES GET ERROR');
				return { error: ex };
			}
		}
		try {
			const issue = await db.get(COLLECTION, { issueNumber });
			return { issuesList: issues };
		} catch (ex) {
			return { error: ex };
		}
	};

	const findComments = async () => {
		const comments = await db.find(COLLECTION, comm);
		return comments;
	};

	const add = async (title, description, slug, status) => {
		if (!title || !description || !status) {
			return {
				error: 'All the fields have to be fill',
			};
		}
		const issueCount = await db.count(COLLECTION);
		const projects = await db.get('projects', { slug });
		console.log(projects);
		const results = await db.add(COLLECTION, {
			issueNumber: slug + '-' + (issueCount + 1),
			title: title,
			description: description,
			status: status,
			project_id: ObjectId(projects[0]._id),
			comments: [],
		});
		return results.result;
	};

	const addComment = async (issueNumber, text, id, author) => {
		var query = { issueNumber: issueNumber };
		var newValues = {
			$set: { comments: [{ text: text, id: id, author: author }] },
		};
		const addNewComent = await db.update(COLLECTION, query, newValues);
		return addNewComent;
	};

	const getCommentsForIssue = async (issueNumber) => {
		const PIPELINE_COMMENTS_BY_ISSUE = [
			{ $match: { issueNumber: issueNumber } },
			{
				$project: {
					comments: 1,
					_id: 1,
					issueNumber: 1,
				},
			},
		];
		const getCommentbyIssue = await db.aggregate(
			COLLECTION,
			PIPELINE_COMMENTS_BY_ISSUE
		);
		return getCommentbyIssue;
	};

	const getOneCommentById = async (issueNumber, id) => {
		const PIPELINE_COMMENTS_BY_ID = [
			{ $unwind: '$comments' },
			{ $match: { issueNumber: issueNumber, 'comments.id': id } },
			{
				$project: {
					comments: 1,
					id: 1,
					issueNumber: 1,
				},
			},
		];
		const comments = await db.aggregate(COLLECTION, PIPELINE_COMMENTS_BY_ID);
		return comments;
	};

	return {
		get,
		add,
		findComments,
		getCommentsForIssue,
		getOneCommentById,
		addComment,
	};
};
