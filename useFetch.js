import React, { useState, useEffect, useRef } from 'react'

export const useFetch = (url) => {

    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    const [state, setState] = useState({ data: null, loading: true, error: null })
    console.log(isMounted);
    useEffect(() => {
        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data: data
                    });
                } else {
                    console.log('setState no se llamó');
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url])

    return state;
}
