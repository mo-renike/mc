

exports.returner = (result, api_name, statusCode) => {
  if (statusCode == undefined) {
    statusCode = 200;
  }
  if (result[0]) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        success: result[0],
        api: api_name,
        data: result[1] || 'Server Error, please try again later',
      }),
    };
  } else {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        success: result[0],
        api: api_name,
        data: isJson(result[1]) ? result[1] : result[1]?.toString() || 'Server Error, please try again later',
      }),
    };
  }
};


function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

exports.datetime = async () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

exports.url_to_json = async (url) => {
  var hash;
  var myJson = {};
  var hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }
  return myJson;
};

/**
 * @des this returns the size of a given object
 */

async function object_size(object) {
  Object.size = async function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  return await Object.size(object);
}

exports.get_access_level = async (id) => {
  let access_level = [4, 5];
  switch (id) {
    case 0:
      access_level.push(2, 3);
      break;
    case 1:
      access_level.push(1, 2, 3);
      break;
    case 2:
      access_level.push(0, 1, 2, 3);
      break;
    default:
      null;
      break;
  }
  return access_level;
};
