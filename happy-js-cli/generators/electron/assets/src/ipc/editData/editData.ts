import simpleDatabase from '../../backend/simpleDatabase';

type DatabaseRow = {
  _id: string,
  [key: string]: unknown
};

async function editData({ _id, ...rest } : DatabaseRow) {
  simpleDatabase.update({ _id }, {
    $set: { ...rest },
  });
}

export default editData;
