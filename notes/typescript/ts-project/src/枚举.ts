// enum的key值只能使用字符串，value值可以为字符串或数字；默认第一个未赋值key的value为0，后续为前一个key值+1

enum HTTP_CODE {
  OK = 200,
  NOT_FOUND = 404
}

HTTP_CODE.OK // 200

