import Rate from '../models/Rate.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js';

const createRate = async (req, res) => {
  const { cob_name, route_id, loading_place, destination, load_type, vehicle_type, latest_rate, trip_configuration } = req.body;
  if (!cob_name || !route_id || !loading_place || !destination || !load_type || !vehicle_type || !latest_rate || !trip_configuration) {
    throw new BadRequestError('Please provide all values');
  }
  const rate = await Rate.create(req.body);
  res.status(StatusCodes.CREATED).json({ rate, msg: 'Rate Created' });
};


const updateRate = async (req, res) => {
  const { id: rateId } = req.params;
  const { cob_name, route_id, loading_place, destination, load_type, vehicle_type, latest_rate, trip_configuration } = req.body;
  if (!cob_name || !route_id || !loading_place || !destination || !load_type || !vehicle_type || !latest_rate || !trip_configuration) {
    throw new BadRequestError('Please provide all values');
  }
  const rate = await Rate.findOne({ _id: rateId });

  if (!rate) {
    throw new NotFoundError(`No rate with id :${rateId}`);
  }

  const updatedRate = await Rate.findOneAndUpdate({ _id: rateId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedRate, msg: 'Rate Updated'  });
};

const getAllRates = async (req, res) => {
  const { sort, search } = req.query;

  const queryObject = {};
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT

  let result = Rate.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const rates = await result;

  const totalRates = await Rate.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRates / limit);

  res.status(StatusCodes.OK).json({ rates, totalRates, numOfPages });
};


const deleteRate = async (req, res) => {
  const { id: rateId } = req.params;

  const rate = await Rate.findOne({ _id: rateId });

  if (!rate) {
    throw new NotFoundError(`No rate with id :${rateId}`);
  }

  await rate.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Rate removed' });
};

const averages = async (req, res) => {
 

  res.status(StatusCodes.OK).json({ });
};

export { createRate, deleteRate, getAllRates, updateRate, averages };
