function isEmpty(data) {
    return (data.publisher !== '' && data.author !== '' && data.name !== '' &&
    data.press !== '' && data.images.length > 0 && data.count > 0 && data.price != '')
}
export {isEmpty};