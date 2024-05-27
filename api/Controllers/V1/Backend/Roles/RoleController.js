const Role = require('../../../../Models/Role');

exports.index = async(req,res)=>{
	const {page = 1, limit =10} = req.query;
	const {search} = req.query;
	const {col='created_at', order=-1} = req.query;
	const roles = await Role.find({$or:[{name: new RegExp(search, 'i')},{description: new RegExp(search, 'i')}]})
	.limit(limit*1)
	.skip((page-1)*limit)
	.sort({[col]: order})
	.populate({path:'author',populate:{path: 'role_id'}})
	.exec();
	const count = await Role.countDocuments();
	res.send({
		roles,
		count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.'
	});
}

exports.store = async(req,res) => {
	const role = new Role({
		name: req.body.name,
		description: req.body.description,
	})
	const result = await role.save();
	res.send({role: result})
}