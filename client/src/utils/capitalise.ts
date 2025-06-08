const capitalise = (str: string) => {
    const strArray = str.split('');

    strArray[0] = strArray[0].toUpperCase();
    str = strArray.join('');

    return str as string;
};

export default capitalise;