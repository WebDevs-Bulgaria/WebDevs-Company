/*
 * „Живото“ кълбо — образът на AI асистента. Стъклена сфера, в която се движат три меки
 * цветни петна, с пулсиращо ядро, отблясък и сияние отвън; цялата сфера диша и леко се
 * деформира, затова изглежда като организъм, а не като икона. Само CSS (стиловете са в
 * globals.css, клас .living-orb): без JavaScript, без картинки, цветовете са тези на глобуса
 * от палитрата (--globe-*). При „намалено движение“ стои неподвижно.
 * Размерът идва от className (ширина и височина), вътрешните части се мащабират сами.
 */
export function LivingOrb({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`living-orb ${className}`}>
      <span className="living-orb__glow" />
      <span className="living-orb__body">
        <span className="living-orb__blob living-orb__blob--a" />
        <span className="living-orb__blob living-orb__blob--b" />
        <span className="living-orb__blob living-orb__blob--c" />
        <span className="living-orb__core" />
        <span className="living-orb__shine" />
      </span>
    </span>
  );
}
