import React from 'react';

type LinkCardParameters = {
  link: string,
  title: string,
  description: string
};

function LinkCard({ link, title, description }: LinkCardParameters) {
  return (
    <a
      href={link}
      className="py-4 px-5 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="font-sans text-2xl font-semibold mb-3">
        {title}
        {' '}
        <span className="inline-block group-hover:translate-x-1">&#8594;</span>
      </h2>
      <p className="font-sans font-light mb-3 max-w-md leading-normal text-black/60">
        {description}
      </p>
    </a>
  );
}

export default LinkCard;
