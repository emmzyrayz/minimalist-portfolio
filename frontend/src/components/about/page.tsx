import './about.css';
import {ProfileIllustration} from "@/assets/icons/boycross";

export const AboutC = () => {
    return (
      <div className="font-sora flex md:flex-row flex-col w-full md:h-full lg:h-[70%] px-[5%] py-[2%] mt-9 md:items-center rounded md:gap-3 lg:gap-7">
        <ProfileIllustration className="md:w-1/2 w-full md:h-full lg:h-[70%]" />
        <div className="about-div flex flex-col md:w-1/2 w-full gap-3 lg:gap-7">
          <div className="about-top font-sora flex w-full items-center justify-center text-[32px] lg:text-[54px]">
            <h1>
              About <span className="font-bold md:font-extrabold">Me</span>
            </h1>
          </div>
          <div className="about-text font-sora flex flex-col w-full text-[14px] md:text-[18px] lg:text-[20px] gap-2">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates debitis facere impedit ducimus voluptatem, doloremque
              voluptatum id perspiciatis ipsum eveniet tempora error nihil rem
              omnis, ratione dignissimos exercitationem neque laboriosam dolorum
              suscipit sequi molestiae quia officia similique! Dolorem, incidunt
              ipsam.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, id
              optio? Ducimus commodi non, officia deleniti rerum voluptas vitae,
              nostrum facilis expedita eum sapiente! Ratione atque cumque
              voluptates magni distinctio rem fugiat, sit, dicta, deleniti vero
              omnis? Nesciunt odit nisi accusantium provident, vel ipsum
              obcaecati temporibus explicabo corrupti blanditiis vitae.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis nam repellat illum laudantium, cumque ipsum quidem
              fugiat saepe tenetur. Odio quas, quae doloribus ab exercitationem
              quod animi temporibus voluptas maiores aperiam unde ipsam tempora
              voluptates quibusdam saepe adipisci. Id at reprehenderit
              blanditiis, eum similique reiciendis cumque.
            </p>
          </div>
        </div>
      </div>
    );
}