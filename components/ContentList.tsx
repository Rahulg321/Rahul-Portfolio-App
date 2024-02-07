"use client";

import { useGSAP } from "@gsap/react";
import { Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

gsap.registerPlugin(ScrollTrigger);

const ContentList = ({
  items,
  contentType,
  viewMoreText = "Read More",
}: ContentListProps) => {
  const container = useRef();
  const listItem = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(
    () => {
      listItem.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom top",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: listItem },
  );

  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  return (
    <div className="mt-8">
      <ul className="grid border-b border-b-slate-100">
        {items.map(
          (item, index) =>
            isFilled.keyText(item.data.title) && (
              <li
                key={index}
                className="opacity-0f list-item"
                ref={(e) => (listItem.current[index] = e)}
              >
                <Link
                  href={`${urlPrefix}/${item.uid}`}
                  className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                  aria-label={item.data.title}
                >
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold">
                      {item.data.title}
                    </span>
                    <div className="flex gap-3 text-lg font-bold text-yellow-300">
                      {item.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-xl font-semibold">
                    {viewMoreText}
                    <MdArrowOutward />
                  </span>
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default ContentList;
