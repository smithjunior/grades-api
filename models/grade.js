export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: [0, 'grade should not be negative']
    },
    lastModified: {
      type: Date,
      default: Date.now
    }
  }, { toJSON: { virtuals: true } })

  const Grade = mongoose.model('grades', schema, 'grades')

  return Grade
}
