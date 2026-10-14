"use client";
import "./CTAWindow.css";

import Copy from "../Copy/Copy";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const CTAWindow = ({
  img,
  mobileImg,
  alt,
  header,
  callout,
  description,
  buttonLabel,
  buttonRoute,
  imageLabel,
}) => {
  return (
    <section className="cta-window">
      <div className="container">
        <div className="cta-window-img-wrapper">
          <picture>
            {mobileImg ? (
              <source media="(max-width: 1000px)" srcSet={mobileImg} type="image/webp" />
            ) : null}
            <source srcSet={img} type="image/webp" />
            <img src={img} alt={alt} loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="cta-window-img-overlay"></div>
        <div className="cta-window-header">
          <Copy delay={0.1}>
            <h2>{header}</h2>
          </Copy>
        </div>
        <div className="cta-window-footer">
          <div className="cta-window-callout">
            <Copy delay={0.1}>
              <h3>{callout}</h3>
            </Copy>
            {imageLabel ? <p className="cta-image-label">{imageLabel}</p> : null}
          </div>
          <div className="cta-window-description">
            <Copy delay={0.1}>
              <p>{description}</p>
            </Copy>
            {buttonLabel && buttonRoute ? (
              <AnimatedButton label={buttonLabel} route={buttonRoute} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWindow;
