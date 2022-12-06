import express from 'express';
const router = express.Router();

import {
  createRate,
  deleteRate,
  getAllRates,
  updateRate,
  averages,
} from '../controllers/rateController.js';


router.route('/').post(createRate).get(getAllRates);
router.route('/averages').get(averages);
router.route('/:id').delete(deleteRate).patch(updateRate);

export default router;
