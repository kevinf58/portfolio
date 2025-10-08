import { JournalPageParams } from "@/types/api/Journal.type";

const Page = async (props: JournalPageParams) => {
  const { id } = await props.params;

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-[65rem] lg:px-48 sm:px-20 px-10 sm:py-32 py-20 gap-1 rounded-sm border-2 border-tint/10 bg-white/8 hover:scale-101 duration-100 cursor-pointer">
        <h1 className="text-5xl font-bold text-tint md:text-left text-center">This is a header</h1>
        <hr className="my-5 mx-10 text-white/40" />
        <p>
          Today started quietly, with the soft hum of the rain against my window. It’s strange how mornings like this
          seem to slow everything down, as if the world collectively decides to take a breath. I made a cup of coffee —
          stronger than usual — and watched the mist roll across the street. There’s something deeply comforting about
          knowing everyone else is probably doing the same: starting their day in some small, familiar ritual.
        </p>
        <p>
          Work was steady but scattered. I tried to focus on one project, but emails and small interruptions kept
          pulling me away. Still, there’s a satisfaction in crossing off even the smallest task from the list. It’s
          proof that progress, however uneven, still counts. During lunch, I walked outside and found the park nearly
          empty. The benches were slick with rain, but the air smelled clean and sharp, like the world had been reset
          overnight.
        </p>
        <p>
          In the evening, I called a friend I haven’t spoken to in months. We talked for almost an hour, mostly about
          nothing in particular — movies we’d watched, recipes we’d ruined, random memories that made us laugh. It
          reminded me how grounding it is to reconnect without any agenda, just the simple joy of hearing a familiar
          voice.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
        <p>
          As the night settled in, I lit a candle and wrote a few lines in my notebook — nothing profound, just
          reflections on the day. I think that’s what I like most about journaling: it doesn’t demand brilliance, only
          honesty. The rain has stopped now, but the streets still shine under the streetlights. Maybe tomorrow will be
          clearer, but for tonight, I’m content with the quiet rhythm of this moment.
        </p>
      </div>
    </section>
  );
};

export default Page;
