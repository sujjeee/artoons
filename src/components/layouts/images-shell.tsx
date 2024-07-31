import React from "react"

export function ImagesShell() {
  const data = [
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg",
      prompt: "Aeroplane in flight.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/astronaut.jpeg",
      prompt: "Astronaut in a spacesuit.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bear.jpeg",
      prompt: "Cute bear standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bike-ride-2.jpeg",
      prompt: "Boy riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/blonde-girl.jpeg",
      prompt: "Blonde girl smiling.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-basketball.jpeg",
      prompt: "Boy playing basketball.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-coding.jpeg",
      prompt: "Boy coding on laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-headphones.jpeg",
      prompt: "Boy with headphones.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cat-fish-bowl.jpeg",
      prompt: "Cat with a fish bowl.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-kite-2.jpeg",
      prompt: "Boy flying a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-laptop.jpeg",
      prompt: "Boy using a laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-magnifying-glass.jpeg",
      prompt: "Boy with a magnifying glass.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-riding-bike.jpeg",
      prompt: "Boy riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-sick.jpeg",
      prompt: "Sick boy lying in bed.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-sitting-under-tree.jpeg",
      prompt: "Boy sitting under a tree.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-skateboarding.jpeg",
      prompt: "Boy skateboarding.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-stressed.jpeg",
      prompt: "Stressed boy with a book.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-tennis.jpeg",
      prompt: "Boy playing tennis.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-walking-dog.jpeg",
      prompt: "Boy walking a dog.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cat.jpeg",
      prompt: "Cute cat sitting.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/chef-2.jpeg",
      prompt: "Chef cooking in kitchen.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-pond.jpeg",
      prompt: "Boy at a pond.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/chicken.jpeg",
      prompt: "Chicken standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-kite.jpeg",
      prompt: "Boy with a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/couple-2.jpeg",
      prompt: "Couple standing together.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/couple.jpeg",
      prompt: "Cozy couple in winter.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cozy-winter-night.jpeg",
      prompt: "Cozy winter night.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cup-of-coffee.jpeg",
      prompt: "Cup of coffee.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cute-robot.jpeg",
      prompt: "Cute robot waving.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/doctor.jpeg",
      prompt: "Doctor with stethoscope.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/dog.jpeg",
      prompt: "Dog sitting.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/dragon.jpeg",
      prompt: "Dragon breathing fire.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/elephant.jpeg",
      prompt: "Elephant standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-barista.jpeg",
      prompt: "Girl barista serving coffee.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-basketball.jpeg",
      prompt: "Girl playing basketball.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-cat-2.jpeg",
      prompt: "Girl with a cat.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-cat.jpeg",
      prompt: "Girl with a cat.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-coding.jpeg",
      prompt: "Girl coding on laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-eating-burger.jpeg",
      prompt: "Girl eating a burger.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-eating-noodles.jpeg",
      prompt: "Girl eating noodles.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-graduating.jpeg",
      prompt: "Girl graduating.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-headphones.jpeg",
      prompt: "Girl with headphones.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab-2.jpeg",
      prompt: "Girl in hijab smiling.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab-3.jpeg",
      prompt: "Girl in hijab with book.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab.jpeg",
      prompt: "Girl in hijab standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-in-a-park.jpeg",
      prompt: "Girl in a park.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-kite-2.jpeg",
      prompt: "Girl flying a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-kite.jpeg",
      prompt: "Girl with a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-laptop.jpeg",
      prompt: "Girl using a laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-magnifying-glass.jpeg",
      prompt: "Girl with a magnifying glass.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-riding-bike.jpeg",
      prompt: "Girl riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-running.jpeg",
      prompt: "Girl running.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-sitting-under-tree.jpeg",
      prompt: "Girl sitting under a tree.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-stressed.jpeg",
      prompt: "Stressed girl studying.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/aeroplane.jpeg",
      prompt: "Aeroplane in flight.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/astronaut.jpeg",
      prompt: "Astronaut in a spacesuit.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bear.jpeg",
      prompt: "Cute bear standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/bike-ride-2.jpeg",
      prompt: "Boy riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/blonde-girl.jpeg",
      prompt: "Blonde girl smiling.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-basketball.jpeg",
      prompt: "Boy playing basketball.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-coding.jpeg",
      prompt: "Boy coding on laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-headphones.jpeg",
      prompt: "Boy with headphones.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cat-fish-bowl.jpeg",
      prompt: "Cat with a fish bowl.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-kite-2.jpeg",
      prompt: "Boy flying a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-laptop.jpeg",
      prompt: "Boy using a laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-magnifying-glass.jpeg",
      prompt: "Boy with a magnifying glass.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-riding-bike.jpeg",
      prompt: "Boy riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-sick.jpeg",
      prompt: "Sick boy lying in bed.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-sitting-under-tree.jpeg",
      prompt: "Boy sitting under a tree.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-skateboarding.jpeg",
      prompt: "Boy skateboarding.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-stressed.jpeg",
      prompt: "Stressed boy with a book.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-tennis.jpeg",
      prompt: "Boy playing tennis.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-walking-dog.jpeg",
      prompt: "Boy walking a dog.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cat.jpeg",
      prompt: "Cute cat sitting.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/chef-2.jpeg",
      prompt: "Chef cooking in kitchen.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-pond.jpeg",
      prompt: "Boy at a pond.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/chicken.jpeg",
      prompt: "Chicken standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/boy-kite.jpeg",
      prompt: "Boy with a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/couple-2.jpeg",
      prompt: "Couple standing together.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/couple.jpeg",
      prompt: "Cozy couple in winter.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cozy-winter-night.jpeg",
      prompt: "Cozy winter night.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cup-of-coffee.jpeg",
      prompt: "Cup of coffee.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/cute-robot.jpeg",
      prompt: "Cute robot waving.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/doctor.jpeg",
      prompt: "Doctor with stethoscope.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/dog.jpeg",
      prompt: "Dog sitting.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/dragon.jpeg",
      prompt: "Dragon breathing fire.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/elephant.jpeg",
      prompt: "Elephant standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-barista.jpeg",
      prompt: "Girl barista serving coffee.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-basketball.jpeg",
      prompt: "Girl playing basketball.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-cat-2.jpeg",
      prompt: "Girl with a cat.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-cat.jpeg",
      prompt: "Girl with a cat.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-coding.jpeg",
      prompt: "Girl coding on laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-eating-burger.jpeg",
      prompt: "Girl eating a burger.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-eating-noodles.jpeg",
      prompt: "Girl eating noodles.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-graduating.jpeg",
      prompt: "Girl graduating.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-headphones.jpeg",
      prompt: "Girl with headphones.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab-2.jpeg",
      prompt: "Girl in hijab smiling.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab-3.jpeg",
      prompt: "Girl in hijab with book.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-hijab.jpeg",
      prompt: "Girl in hijab standing.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-in-a-park.jpeg",
      prompt: "Girl in a park.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-kite-2.jpeg",
      prompt: "Girl flying a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-kite.jpeg",
      prompt: "Girl with a kite.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-laptop.jpeg",
      prompt: "Girl using a laptop.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-magnifying-glass.jpeg",
      prompt: "Girl with a magnifying glass.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-riding-bike.jpeg",
      prompt: "Girl riding a bike.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-running.jpeg",
      prompt: "Girl running.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-sitting-under-tree.jpeg",
      prompt: "Girl sitting under a tree.",
    },
    {
      image:
        "https://tiny-little-illustrations.pages.dev/_ipx/_/illustrations/girl-stressed.jpeg",
      prompt: "Stressed girl studying.",
    },
  ]
  return (
    <section className="sm:container sm:max-w-screen-lg flex items-center justify-center">
      <div className="list-none space-y-2 sm:block sm:columns-2 sm:gap-2 lg:columns-5 pb-28">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl text-left overflow-hidden shadow-sm"
          >
            <figure className="my-0 flex w-full flex-none flex-col rounded-xl bg-gray-50 p-2 pb-2 dark:bg-gray-900 sm:w-48 lg:w-52 2xl:w-56">
              <div aria-label="View Image" role="button" className="w-full">
                <img
                  alt=""
                  src={item.image}
                  className="m-0 w-full rounded-xl object-cover object-top sm:h-48 sm:w-48 lg:h-52 lg:w-52 2xl:h-56 2xl:w-56"
                />
              </div>{" "}
              <figcaption className="mt-0 px-0 py-0">
                <dl className="mt-2 rounded-xl p-1">
                  <dt className="relative flex select-none items-center justify-start gap-1 text-xs text-gray-400">
                    Prompt
                    <button
                      type="button"
                      title="Copy to clipboard"
                      className="relative rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800/60 inline-flex cursor-pointer items-center text-sm focus:outline-none  mx-0.5   text-gray-600 "
                    >
                      <svg
                        viewBox="0 0 32 32"
                        preserveAspectRatio="xMidYMid meet"
                        height="1em"
                        width="1em"
                        role="img"
                        fill="currentColor"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        focusable="false"
                      >
                        <path
                          transform="translate(0)"
                          d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"
                        ></path>
                        <path
                          transform="translate(0)"
                          d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"
                        ></path>
                        <rect height="32" width="32" fill="none"></rect>
                      </svg>{" "}
                    </button>{" "}
                  </dt>
                  <dd
                    title="a girl wandering through the forest"
                    className="line-clamp-5 text-sm text-gray-800"
                  >
                    {item.prompt}
                  </dd>
                </dl>{" "}
              </figcaption>
            </figure>{" "}
          </div>
        ))}
      </div>
    </section>
  )
}
