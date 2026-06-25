import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  images: [String],
  category: String,
  tags: [String],
  orderIndex: {
    type: Number,
    default: 0
  },
  orderSourceFields: [
    {
      name: String,
      label: String,
      type: {
        type: String,
        enum: ['text', 'number', 'dropdown', 'multi-select']
      },
      placeholder: String,
      helpText: String,
      required: {
        type: Boolean,
        default: true
      },
      validation: {
        minLength: Number,
        maxLength: Number,
        pattern: String,
        options: [String]
      },
      order: Number
    }
  ],
  packages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for sorting by orderIndex
gameSchema.index({ orderIndex: 1, name: 1 });

export default mongoose.model('Game', gameSchema);
