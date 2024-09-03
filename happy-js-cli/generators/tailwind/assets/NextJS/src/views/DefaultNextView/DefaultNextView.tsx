import React from 'react';

import Image from 'next/image';
import Logo from './components/Logo';
import LinkCard from './components/LinkCard';

export default function DefaultNextView() {
  return (
    <main className="min-h-screen justify-between items-center max-w-5xl m-auto p-24 flex flex-col">
      <div className="flex justify-between items-center text-sm w-full z-2 font-mono">
        <p className="relative m-0 p-4 bg-neutral-100/50 border border-solid border-neutral-400/30 rounded-xl">
          Get started by editing&nbsp;
          <code className="font-bold">pages/index.tsx</code>
        </p>
        <div>
          <a
            className="flex justify-center items-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By
            {' '}
            <Logo />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center relative px-16
        before:[background: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))] before:rounded-[50%] before:w-[480px] before:h-[360px] before:ml-[-400px] before:left-1/2 before:absolute before:blur-[45px]
        after:[background: conic-gradient(from 180deg at 50% 50%, #16abff33 0deg, #0885ff33 55deg, #54d6ff33 120deg, #0071ff33 160deg, transparent 360deg)] after:w-[240px] h-[180px] -z-1 before:left-1/2 after:absolute after:blur-[45px]"
      >
        <Image
          className="relative"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className="relative flex z-1 items-center justify-center w-[75px] h-[75px] py-6 px-2 ml-4 rounded-xl overflow-hidden drop-shadow-md
          before:absolute before:-z-10 before:animate-spin before:w-[200%] before:h-[200%] before:bg-[conic-gradient(#00000080,#00000040,#00000030,#00000020,#00000010,#00000010,#00000080)]
          after:absolute after:-z-10 after:inset-0 after:p-[1px] after:rounded-xl after:bg-gradient-to-br after:from-gray-100 after:to-gray-300 after:bg-clip-content"
        >
          <Image
            src="/thirteen.svg"
            alt="13"
            width={40}
            height={31}
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        <LinkCard
          link="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Docs"
          description="Find in-depth information about Next.js features and API."
        />
        <LinkCard
          link="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Learn"
          description="Learn about Next.js in an interactive course with quizzes!"
        />

        <LinkCard
          link="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Templates"
          description="Discover and deploy boilerplate example Next.js projects."
        />
        <LinkCard
          link="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Deploy"
          description="Instantly deploy your Next.js site to a shareable URL with Vercel."
        />
      </div>
    </main>
  );
}
