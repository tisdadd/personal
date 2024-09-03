import simpleDatabase from '../../backend/simpleDatabase';

function getData() {
  return simpleDatabase.getAllData();
}

export default getData;
