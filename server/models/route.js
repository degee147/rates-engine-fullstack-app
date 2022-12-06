import mongoose from 'mongoose'

const RouteSchema = new mongoose.Schema(
  {
    cob_name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
    },
    route_id: {
      type: String,
      required: [true, 'Please provide route_id'],
      maxlength: 100,
    },
    loading_place: {
      type: String,
      required: [true, 'Please provide loading_place'],
      maxlength: 100,
    },
    destination: {
      type: String,
      required: [true, 'Please provide destination'],
      maxlength: 100,
    },
    load_type: {
      type: String,
      required: [true, 'Please provide load_type'],
      maxlength: 100,
    },
    vehicle_type: {
      type: String,
      required: [true, 'Please provide vehicle_type'],
      maxlength: 100,
    },
    avg_rate: {
      type: Number,
      required: [true, 'Please provide latest_rate'],
    },
    highest_rate: {
      type: Number,
      required: [true, 'Please provide latest_rate'],
    },
    lowest_rate: {
      type: Number,
      required: [true, 'Please provide latest_rate'],
    },
    trip_configuration: {
      type: String,
      required: [true, 'Please provide trip_configuration'],
      maxlength: 100,
    }
  },
  { timestamps: true }
)

export default mongoose.model('Route', RouteSchema)
