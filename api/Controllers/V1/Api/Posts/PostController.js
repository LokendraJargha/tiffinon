const Post = require('../../../../Models/Post');

exports.index = async(req,res)=>{
	const {page = 1, limit =10} = req.query;
	const {search} = req.query;
	const {col='created_at', order=-1} = req.query;
	const posts = await Post.find({$or:[{title: new RegExp(search, 'i')},{description: new RegExp(search, 'i')}]})
	.limit(limit*1)
	.skip((page-1)*limit)
	.sort({[col]: order})
	.populate({path:'author',populate:{path: 'role_id'}})
	.exec();
	const count = await Post.countDocuments();
	res.send({
		posts,
		count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.'
	});
}

exports.store = async(req,res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
		author: req.user._id
	})
	const result = await post.save()
	res.send({
		post: result,
		message: 'post successfully created!'
	})
}

exports.edit = async(req,res)=>{
	const post = await Post.findById(req.params.id);
	res.send({
		post,
		message: 'Edit Data fetched successfully.'
	}).status(200);
}

exports.update = async (req, res) => {
	const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
	res.send({
		post, 
		message: 'Post update successfully.'
	}).status(200);
}

exports.delete = async(req, res) =>{
	const post = await Post.findByIdAndRemove(req.params.id);
	res.send({
		post,
		message: 'successfully delete post.'
	}).status(200);
}