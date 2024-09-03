const REGEX_LOG_TIMESTAMP = /.*\|? ?\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/

const REGEX_PRISMA_ANNOTATIONS = /@.*/
const REGEX_PRISMA_SPACE =  / +(\w+) +(\w+)(\??) */ //replacement $1: $2$3
const REGEX_PRISMA_REQUIRES = /(\w+): +(\w+)\n */ // replacement $1: $2!\n
const REGEX_PRISMA_OPTIONAL = /(\w+): +(\w+)\? */ // replacement  $1: $2