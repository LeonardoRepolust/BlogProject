export default interface Comment {
    id?: Number,
    postID: Number,
    parentComment?: Comment,
    body: String
}