import fs from 'fs'
import prepareDbData from '../../utils/prepare-db-data'

export default (req, res) => {
  const db = JSON.parse(fs.readFileSync('./db.json'))

  res.status(200).json(prepareDbData(db));
};
