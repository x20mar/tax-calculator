class DomainError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

class ResourceNotFoundError extends DomainError {
    constructor(resource) {
        super(`Resource ${resource} was not found.`)
        this.data = { resource }
    }
}

class InternalError extends DomainError {
    constructor(error) {
        super(error.message)
        this.data = { error }
    }
}

module.exports = {
    ResourceNotFoundError,
    InternalError
}