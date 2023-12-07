import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../assets/images/image-placeholder.webp";
import Skeleton from "../../components/Skeleton.jsx";

const countryFlag = ({ flags, loading, ...rest }) => {
    const [imageSrc, setImageSrc] = useState(flags?.svg);

    useEffect(() => {
        if (loading) return;
        const img = new Image();
        img.src = flags.svg;
        img.onerror = () => {
            img.src = flags.png;
            img.onerror = () => setImageSrc(imagePlaceholder);
        };
        img.onload = () => setImageSrc(img.src);
    }, [loading, flags?.svg, flags?.png]);

    return (
        <Skeleton loading={loading}>
            <img
                {...rest}
                src={imageSrc}
                alt={flags?.alt}
                aria-hidden={flags?.alt ? undefined : true}
            />
        </Skeleton>
    )
}

export default countryFlag;