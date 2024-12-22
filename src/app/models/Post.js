const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        _id: { type: Number },
        userId: { type: Number, required: true },
        title: { type: String, default: '', required: true },
        author: { type: String, default: '' },
        content: { type: String, default: '' },
        category: { type: String },
        credit: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Course.pre("save", function (next) {
//   this.slug = this.name.split(" ").join("-");
//   next();
// });

// Custom query helpers
Post.query.sortable = function (req) {
    if (req.query._sort === '') {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

Post.plugin(AutoIncrement);

Post.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);
