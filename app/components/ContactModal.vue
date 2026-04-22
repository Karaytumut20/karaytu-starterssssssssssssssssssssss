<template>
  <div v-if="isVisible" class="fixed left-0 top-0 z-[10005] h-[100dvh] w-full">
    <div
      ref="backdropRef"
      class="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none bg-black/80"
      :class="store.isBot ? 'opacity-100' : 'opacity-0'"
    ></div>

    <div
      ref="modalSlideContainerRef"
      class="absolute inset-0 pointer-events-none"
      :class="initialHideClass"
    >
      <div
        ref="scrollWrapperRef"
        class="absolute inset-0 overflow-y-auto pointer-events-auto overscroll-none pb-safe-bottom pl-safe-left pr-safe-right pt-safe-top"
        style="-webkit-overflow-scrolling: touch"
        @scroll="handleModalScroll"
        @click="closeModal"
      >
        <div
          ref="scrollContentRef"
          class="flex flex-col justify-end w-full min-h-full"
        >
          <div
            class="w-full md:grid md:grid-cols-14 md:gap-grid-gutter md:px-[var(--page-margin)]"
          >
            <div
              ref="modalRef"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              class="relative flex flex-col w-full shadow-2xl cursor-auto bg-light text-dark will-change-transform md:col-span-6 md:col-start-7 md:-ml-grid-gutter md:-mr-page-margin md:w-auto"
              @click.stop
            >
              <header
                class="sticky top-0 z-20 flex w-full shrink-0 flex-col bg-light px-[var(--page-margin)] pt-[var(--page-margin)]"
              >
                <div
                  class="grid items-start w-full grid-cols-6 shrink-0 gap-grid-gutter md:grid-cols-7"
                >
                  <div class="col-span-3 md:col-span-1 md:col-start-1">
                    <h1
                      id="contact-modal-title"
                      class="text-base font-medium tracking-tight text-dark"
                    >
                      İletişime Geçin
                    </h1>
                  </div>

                  <div class="hidden md:col-span-3 md:col-start-3 md:block">
                    <p class="text-base font-medium tracking-tight text-dark">
                      YatigoTR Yatçılık — İstanbul
                    </p>
                  </div>

                  <div
                    class="flex justify-end col-span-3 md:col-span-2 md:col-start-6"
                  >
                    <button
                      type="button"
                      @click="closeModal"
                      class="text-base font-medium tracking-tight text-dark"
                      aria-label="Close Contact Form"
                    >
                      Kapat
                    </button>
                  </div>
                </div>

                <div
                  class="relative mt-[var(--page-margin)] h-[1px] w-full shrink-0 overflow-hidden bg-dark"
                  aria-hidden="true"
                >
                  <div
                    ref="progressLineRef"
                    class="absolute top-0 left-0 w-full h-full origin-left scale-x-0 bg-dark will-change-transform"
                  ></div>
                </div>
              </header>

              <form
                @submit.prevent="validateAndSend"
                class="flex flex-col px-[var(--page-margin)] pb-[calc(var(--page-margin)*4)]"
                aria-label="Contact Request Form"
              >
                <p
                  ref="heroTextRef"
                  class="mt-[var(--page-margin)] w-full text-6xl font-normal leading-[1.1] tracking-tighter text-dark md:text-5xl"
                >
                  <span
                    class="pointer-events-none inline-block w-[calc((100%+var(--grid-gutter))/6)] select-none opacity-0 md:w-[calc((100%+var(--grid-gutter))/7)]"
                    aria-hidden="true"
                    >&#8203;</span
                  >İstanbul Boğazı'nın eşsiz sularında unutulmaz bir deneyim yaşamaya ne dersiniz? 
                  İster romantik bir evlenme teklifi, ister özel bir kutlama, ister kalabalık organizasyonlarınız olsun; 
                  size en uygun yatı seçerek hayallerinizi gerçeğe dönüştürelim.
                </p>

                <div
                  ref="section1Ref"
                  class="mt-[calc(var(--page-margin)*6)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s1 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s1 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      01
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <h2
                      id="services-heading"
                      class="text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s1 ? 'text-red-500' : 'text-dark'"
                    >
                      İlgilendiğiniz Ürün/Hizmet
                    </h2>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <div
                      class="flex flex-col items-start w-full"
                      role="group"
                      aria-labelledby="services-heading"
                    >
                      <template
                        v-for="(service, index) in services"
                        :key="service"
                      >
                        <button
                          type="button"
                          role="checkbox"
                          :aria-checked="selectedServices.includes(service)"
                          @click="
                            toggleService(service);
                            errors.s1 = false;
                          "
                          class="flex items-center w-full gap-4 text-left outline-none group md:gap-5"
                          :class="
                            index === 0
                              ? 'pb-[var(--page-margin)] md:pb-[calc(var(--page-margin)/2)]'
                              : index === services.length - 1
                                ? 'pt-[var(--page-margin)] md:pt-[calc(var(--page-margin)/2)]'
                                : 'py-[var(--page-margin)] md:py-[calc(var(--page-margin)/2)]'
                          "
                        >
                          <div
                            class="flex items-center justify-center w-4 h-4 overflow-hidden transition-colors duration-300 border rounded-full shrink-0 md:h-5 md:w-5"
                            :class="
                              errors.s1 ? 'border-red-500' : 'border-dark'
                            "
                          >
                            <div
                              class="w-full h-full transition-transform duration-500 ease-out origin-center rounded-full"
                              :class="[
                                selectedServices.includes(service)
                                  ? 'scale-100'
                                  : 'scale-0 group-hover:scale-[0.4]',
                                errors.s1 ? 'bg-red-500' : 'bg-dark',
                              ]"
                            ></div>
                          </div>
                          <span
                            class="text-xl font-medium tracking-tight transition-colors duration-300"
                            :class="errors.s1 ? 'text-red-500' : 'text-dark'"
                            >{{ service }}</span
                          >
                        </button>

                        <div
                          v-if="index < services.length - 1"
                          class="h-[1px] w-full shrink-0 transition-colors duration-300"
                          :class="errors.s1 ? 'bg-red-500' : 'bg-dark'"
                          aria-hidden="true"
                        ></div>
                      </template>
                    </div>
                  </div>
                </div>

                <div
                  ref="section2Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s2 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s2 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      02
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <h2
                      id="room-count-heading"
                      class="text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s2 ? 'text-red-500' : 'text-dark'"
                    >
                      Katılımcı Sayısı
                    </h2>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <div
                      class="flex flex-col items-start w-full"
                      role="radiogroup"
                      aria-labelledby="room-count-heading"
                    >
                      <template
                        v-for="(roomCount, index) in roomCounts"
                        :key="roomCount"
                      >
                        <button
                          type="button"
                          role="radio"
                          :aria-checked="selectedRoomCount === roomCount"
                          @click="
                            setRoomCount(roomCount);
                            errors.s2 = false;
                          "
                          class="flex items-center w-full gap-4 text-left outline-none group md:gap-5"
                          :class="
                            index === 0
                              ? 'pb-[var(--page-margin)] md:pb-[calc(var(--page-margin)/2)]'
                              : index === roomCounts.length - 1
                                ? 'pt-[var(--page-margin)] md:pt-[calc(var(--page-margin)/2)]'
                                : 'py-[var(--page-margin)] md:py-[calc(var(--page-margin)/2)]'
                          "
                        >
                          <div
                            class="flex items-center justify-center w-4 h-4 overflow-hidden transition-colors duration-300 border rounded-full shrink-0 md:h-5 md:w-5"
                            :class="
                              errors.s2 ? 'border-red-500' : 'border-dark'
                            "
                          >
                            <div
                              class="w-full h-full transition-transform duration-500 ease-out origin-center rounded-full"
                              :class="[
                                selectedRoomCount === roomCount
                                  ? 'scale-100'
                                  : 'scale-0 group-hover:scale-[0.4]',
                                errors.s2 ? 'bg-red-500' : 'bg-dark',
                              ]"
                            ></div>
                          </div>
                          <span
                            class="text-xl font-medium tracking-tight transition-colors duration-300"
                            :class="errors.s2 ? 'text-red-500' : 'text-dark'"
                            >{{ roomCount }}</span
                          >
                        </button>

                        <div
                          v-if="index < roomCounts.length - 1"
                          class="h-[1px] w-full shrink-0 transition-colors duration-300"
                          :class="errors.s2 ? 'bg-red-500' : 'bg-dark'"
                          aria-hidden="true"
                        ></div>
                      </template>
                    </div>
                  </div>
                </div>

                <div
                  ref="section3Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s3 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s3 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      03
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <label
                      for="phone"
                      class="block text-xl font-medium tracking-tight transition-colors duration-300 cursor-pointer"
                      :class="errors.s3 ? 'text-red-500' : 'text-dark'"
                    >
                      Telefon Numaranız
                    </label>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      v-model="form.phone"
                      @input="errors.s3 = false"
                      :aria-invalid="errors.s3"
                      aria-required="true"
                      placeholder="0 (5XX) XXX XX XX"
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      class="w-full bg-transparent pb-[var(--page-margin)] text-xl font-medium tracking-tight outline-none transition-colors duration-300 md:pb-[calc(var(--page-margin)/2)]"
                      :class="
                        errors.s3
                          ? 'text-red-500 placeholder-red-500/50'
                          : 'text-dark placeholder-dark/30'
                      "
                    />
                  </div>
                </div>

                <div
                  ref="section4Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s4 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s4 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      04
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <label
                      for="name"
                      class="block text-xl font-medium tracking-tight transition-colors duration-300 cursor-pointer"
                      :class="errors.s4 ? 'text-red-500' : 'text-dark'"
                    >
                      Adınız Soyadınız
                    </label>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      v-model="form.name"
                      @input="errors.s4 = false"
                      :aria-invalid="errors.s4"
                      aria-required="true"
                      placeholder="Adınız Soyadınız"
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      class="w-full bg-transparent pb-[var(--page-margin)] text-xl font-medium tracking-tight outline-none transition-colors duration-300 md:pb-[calc(var(--page-margin)/2)]"
                      :class="
                        errors.s4
                          ? 'text-red-500 placeholder-red-500/50'
                          : 'text-dark placeholder-dark/30'
                      "
                    />
                  </div>
                </div>

                <div
                  ref="section5Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s5 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s5 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      05
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <label
                      for="email"
                      class="block text-xl font-medium tracking-tight transition-colors duration-300 cursor-pointer"
                      :class="errors.s5 ? 'text-red-500' : 'text-dark'"
                    >
                      E-posta Adresiniz
                    </label>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      v-model="form.email"
                      @input="errors.s5 = false"
                      :aria-invalid="errors.s5"
                      aria-required="true"
                      placeholder="E-posta Adresiniz"
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      class="w-full bg-transparent pb-[var(--page-margin)] text-xl font-medium tracking-tight outline-none transition-colors duration-300 md:pb-[calc(var(--page-margin)/2)]"
                      :class="
                        errors.s5
                          ? 'text-red-500 placeholder-red-500/50'
                          : 'text-dark placeholder-dark/30'
                      "
                    />
                  </div>
                </div>

                <div
                  ref="section6Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s6 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s6 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      06
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <label
                      for="details"
                      class="block text-xl font-medium tracking-tight transition-colors duration-300 cursor-pointer"
                      :class="errors.s6 ? 'text-red-500' : 'text-dark'"
                    >
                      Proje Detayları
                    </label>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <textarea
                      id="details"
                      name="details"
                      v-model="form.details"
                      @input="errors.s6 = false"
                      :aria-invalid="errors.s6"
                      aria-required="true"
                      placeholder="Ölçü, renk tercihleri, mekanın durumu veya aklınızdaki diğer detayları bizimle paylaşın..."
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      class="h-32 w-full resize-none bg-transparent pb-[var(--page-margin)] text-xl font-medium leading-[1.1] tracking-tight outline-none transition-colors duration-300 md:h-48 md:pb-[calc(var(--page-margin)/2)]"
                      :class="
                        errors.s6
                          ? 'text-red-500 placeholder-red-500/50'
                          : 'text-dark placeholder-dark/30'
                      "
                      style="line-height: 1.1 !important"
                    ></textarea>
                  </div>
                </div>

                <div
                  ref="section7Ref"
                  class="mt-[calc(var(--page-margin)*2)] h-[1px] w-full shrink-0 transition-colors duration-300"
                  :class="errors.s7 ? 'bg-red-500' : 'bg-dark'"
                  aria-hidden="true"
                ></div>

                <div
                  class="mt-[var(--page-margin)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:mt-[calc(var(--page-margin)/2)] md:grid-cols-7"
                >
                  <div
                    class="col-span-1 col-start-1 md:col-span-1 md:col-start-1"
                  >
                    <span
                      class="block text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s7 ? 'text-red-500' : 'text-dark'"
                      aria-hidden="true"
                    >
                      07
                    </span>
                  </div>

                  <div
                    class="col-span-5 col-start-3 md:col-span-2 md:col-start-3"
                  >
                    <h2
                      id="timeline-heading"
                      class="text-xl font-medium tracking-tight transition-colors duration-300"
                      :class="errors.s7 ? 'text-red-500' : 'text-dark'"
                    >
                      Planlanan Zaman
                    </h2>
                  </div>

                  <div
                    class="col-span-5 col-start-3 mt-[calc(var(--page-margin)*2)] flex w-full flex-col md:col-span-4 md:col-start-4 md:mt-0"
                  >
                    <div
                      class="flex flex-col items-start w-full"
                      role="radiogroup"
                      aria-labelledby="timeline-heading"
                    >
                      <template
                        v-for="(timeline, index) in timelines"
                        :key="timeline"
                      >
                        <button
                          type="button"
                          role="radio"
                          :aria-checked="selectedTimeline === timeline"
                          @click="
                            setTimeline(timeline);
                            errors.s7 = false;
                          "
                          class="flex items-center w-full gap-4 text-left outline-none group md:gap-5"
                          :class="
                            index === 0
                              ? 'pb-[var(--page-margin)] md:pb-[calc(var(--page-margin)/2)]'
                              : index === timelines.length - 1
                                ? 'pt-[var(--page-margin)] md:pt-[calc(var(--page-margin)/2)]'
                                : 'py-[var(--page-margin)] md:py-[calc(var(--page-margin)/2)]'
                          "
                        >
                          <div
                            class="flex items-center justify-center w-4 h-4 overflow-hidden transition-colors duration-300 border rounded-full shrink-0 md:h-5 md:w-5"
                            :class="
                              errors.s7 ? 'border-red-500' : 'border-dark'
                            "
                          >
                            <div
                              class="w-full h-full transition-transform duration-500 ease-out origin-center rounded-full"
                              :class="[
                                selectedTimeline === timeline
                                  ? 'scale-100'
                                  : 'scale-0 group-hover:scale-[0.4]',
                                errors.s7 ? 'bg-red-500' : 'bg-dark',
                              ]"
                            ></div>
                          </div>
                          <span
                            class="text-xl font-medium tracking-tight transition-colors duration-300"
                            :class="errors.s7 ? 'text-red-500' : 'text-dark'"
                            >{{ timeline }}</span
                          >
                        </button>

                        <div
                          v-if="index < timelines.length - 1"
                          class="h-[1px] w-full shrink-0 transition-colors duration-300"
                          :class="errors.s7 ? 'bg-red-500' : 'bg-dark'"
                          aria-hidden="true"
                        ></div>
                      </template>
                    </div>
                  </div>
                </div>

                <div
                  class="mt-[calc(var(--page-margin)*4)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:grid-cols-7"
                >
                  <div
                    class="flex flex-col items-start w-full col-span-5 col-start-3 md:col-span-4 md:col-start-4"
                  >
                    <button
                      type="submit"
                      aria-label="Submit Contact Form"
                      class="relative pb-1 text-xl font-medium tracking-tight outline-none text-dark"
                      @mouseenter="playSubmitLineAnim"
                    >
                      Talebi Gönder
                      <span
                        ref="submitLineRef"
                        class="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-dark will-change-transform"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </div>
                </div>

                <div
                  ref="privacyRef"
                  class="mt-[calc(var(--page-margin)*2/3)] grid w-full shrink-0 grid-cols-6 items-start gap-grid-gutter md:grid-cols-7"
                >
                  <div
                    class="flex flex-col items-start w-full col-span-5 col-start-3 md:col-span-4 md:col-start-4"
                  >
                    <button
                      type="button"
                      role="checkbox"
                      :aria-checked="acceptedPrivacy"
                      @click="
                        togglePrivacy();
                        errors.privacy = false;
                      "
                      class="flex items-center w-full gap-3 text-left outline-none group"
                    >
                      <div
                        class="flex items-center justify-center w-3 h-3 overflow-hidden transition-colors duration-300 border rounded-full shrink-0"
                        :class="
                          errors.privacy ? 'border-red-500' : 'border-dark'
                        "
                      >
                        <div
                          class="w-full h-full transition-transform duration-500 ease-out origin-center rounded-full"
                          :class="[
                            acceptedPrivacy
                              ? 'scale-100'
                              : 'scale-0 group-hover:scale-[0.4]',
                            errors.privacy ? 'bg-red-500' : 'bg-dark',
                          ]"
                        ></div>
                      </div>
                      <span
                        class="text-base font-medium tracking-tight transition-colors duration-300"
                        :class="errors.privacy ? 'text-red-500' : 'text-dark'"
                      >
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          @click.stop
                          class="underline transition-colors duration-300 hover:opacity-50"
                          :class="errors.privacy ? 'text-red-500' : 'text-dark'"
                          >Gizlilik Politikası</a
                        >'nı kabul ediyorum.
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { gsap } from "gsap";
import { useAppStore } from "~/stores/app";
import { siteConfig } from "~/utils/site";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "~/lib/gsap/SplitText.js";

const store = useAppStore();
const route = useRoute();
const { isContactOpen } = storeToRefs(store);

const backdropRef = ref<HTMLElement | null>(null);
const modalSlideContainerRef = ref<HTMLElement | null>(null);
const scrollWrapperRef = ref<HTMLElement | null>(null);
const scrollContentRef = ref<HTMLElement | null>(null);
const modalRef = ref<HTMLElement | null>(null);
const progressLineRef = ref<HTMLElement | null>(null);
const heroTextRef = ref<HTMLElement | null>(null);

const section1Ref = ref<HTMLElement | null>(null);
const section2Ref = ref<HTMLElement | null>(null);
const section3Ref = ref<HTMLElement | null>(null);
const section4Ref = ref<HTMLElement | null>(null);
const section5Ref = ref<HTMLElement | null>(null);
const section6Ref = ref<HTMLElement | null>(null);
const section7Ref = ref<HTMLElement | null>(null);
const privacyRef = ref<HTMLElement | null>(null);

const submitLineRef = ref<HTMLElement | null>(null);
let submitLineAnim: gsap.core.Timeline | null = null;

const playSubmitLineAnim = () => {
  if (!submitLineRef.value) return;

  if (submitLineAnim && submitLineAnim.isActive()) return;

  submitLineAnim = gsap.timeline();
  submitLineAnim
    .to(submitLineRef.value, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "power3.inOut",
    })
    .set(submitLineRef.value, { transformOrigin: "left center" })
    .to(submitLineRef.value, {
      scaleX: 1,
      duration: 0.3,
      ease: "power3.inOut",
      force3D: true,
    });
};

const initialHideClass = ref(store.isBot ? "" : "opacity-0");
const isVisible = ref(store.isContactOpen);
let heroSplit: any = null;

const form = ref({
  phone: "",
  name: "",
  email: "",
  details: "",
});

const selectedServices = ref<string[]>([]);
const selectedRoomCount = ref<string | null>(null);
const selectedTimeline = ref<string | null>(null);
const acceptedPrivacy = ref(false);

const errors = ref({
  s1: false,
  s2: false,
  s3: false,
  s4: false,
  s5: false,
  s6: false,
  s7: false,
  privacy: false,
});

const validateAndSend = () => {
  let hasError = false;
  let firstErrorElement: HTMLElement | null = null;

  const checkError = (
    isValid: boolean,
    key: keyof typeof errors.value,
    elRef: HTMLElement | null,
  ) => {
    if (!isValid) {
      errors.value[key] = true;
      if (!hasError) {
        firstErrorElement = elRef;
        hasError = true;
      }
    } else {
      errors.value[key] = false;
    }
  };

  checkError(selectedServices.value.length > 0, "s1", section1Ref.value);
  checkError(selectedRoomCount.value !== null, "s2", section2Ref.value);
  checkError(form.value.phone.trim().length > 0, "s3", section3Ref.value);
  checkError(form.value.name.trim().length > 0, "s4", section4Ref.value);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  checkError(emailRegex.test(form.value.email.trim()), "s5", section5Ref.value);

  checkError(form.value.details.trim().length > 0, "s6", section6Ref.value);
  checkError(selectedTimeline.value !== null, "s7", section7Ref.value);
  checkError(acceptedPrivacy.value === true, "privacy", privacyRef.value);

  if (hasError && firstErrorElement) {
    const targetEl = firstErrorElement as HTMLElement;
    // 🔥 GÜNCELLEME: Lenis jitter hatasını engellemek için yerel scroll davranışı sağlandı
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  alert(
    "Başarılı: Talebiniz güvenli bir şekilde alındı ve YatigoTR Yatçılık ekibine iletildi. Sizinle en kısa sürede iletişime geçeceğiz.",
  );
};
const services = [
  "Özel Boğaz Turu",
  "Yemekli Yat Turu",
  "Yatta Evlenme Teklifi",
  "Doğum Günü & Parti",
  "Şirket Etkinliği",
  "Belirtilmemiş",
];

const toggleService = (service: string) => {
  const index = selectedServices.value.indexOf(service);
  if (index > -1) {
    selectedServices.value.splice(index, 1);
  } else {
    selectedServices.value.push(service);
  }
};
const roomCounts = [
  "1 - 4 Kişi",
  "5 - 10 Kişi",
  "11 - 20 Kişi",
  "20+ Kişi",
];

const setRoomCount = (roomCount: string) => {
  selectedRoomCount.value =
    selectedRoomCount.value === roomCount ? null : roomCount;
};
const timelines = [
  "Bu hafta",
  "Önümüzdeki Hafta",
  "Bu ay içinde",
  "Sadece fiyat bilgisi",
];

const setTimeline = (timeline: string) => {
  selectedTimeline.value =
    selectedTimeline.value === timeline ? null : timeline;
};

const togglePrivacy = () => {
  acceptedPrivacy.value = !acceptedPrivacy.value;
};

const pageTitle = computed(() =>
  isContactOpen.value ? `İletişime Geçin | ${siteConfig.shortName}` : undefined,
);
const pageDesc = computed(() =>
  isContactOpen.value
    ? "Özel anlarınızı İstanbul Boğazı'nda lüks yatlarımızla taçlandırın. Ücretsiz teklif ve rezervasyon için iletişime geçin."
    : undefined,
);
const pageUrl = computed(() =>
  isContactOpen.value ? `${siteConfig.url}/contact` : undefined,
);

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  keywords: computed(() =>
    isContactOpen.value
      ? "İletişim YatigoTR Yatçılık, İstanbul Yat Kiralama, Boğaz Turu, Ücretsiz Teklif Al"
      : undefined,
  ),
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: pageUrl,
  ogType: computed(() => (isContactOpen.value ? "website" : undefined)),
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterCard: computed(() =>
    isContactOpen.value ? "summary_large_image" : undefined,
  ),
});

useSchemaOrg([
  defineWebPage({
    "@type": computed(() =>
      isContactOpen.value ? "ContactPage" : "WebPage",
    ) as any,
    name: pageTitle,
    description: pageDesc,
    url: pageUrl,
  }),
]);

// 🔥 GÜNCELLEME: Native Scroll Dinleyicisi
const handleModalScroll = () => {
  if (progressLineRef.value && modalRef.value && scrollWrapperRef.value) {
    const currentScroll = scrollWrapperRef.value.scrollTop;
    // İçeriğin tam yüksekliği - Dış kabın yüksekliği
    const maxScroll =
      scrollWrapperRef.value.scrollHeight - scrollWrapperRef.value.clientHeight;

    if (maxScroll <= 0) return;

    const stickyThreshold = modalRef.value.offsetTop;

    if (currentScroll <= stickyThreshold) {
      gsap.set(progressLineRef.value, { scaleX: 0 });
    } else {
      const progress =
        (currentScroll - stickyThreshold) / (maxScroll - stickyThreshold);
      gsap.set(progressLineRef.value, {
        scaleX: Math.min(Math.max(progress, 0), 1),
      });
    }
  }
};

watch(isContactOpen, async (newVal) => {
  if (!newVal && !isVisible.value) return;

  gsap.killTweensOf([modalRef.value, backdropRef.value]);

  if (newVal) {
    isVisible.value = true;
    initialHideClass.value = "opacity-0";
    await nextTick();

    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.scrollTop = 0;
    }
    if (progressLineRef.value) {
      gsap.set(progressLineRef.value, { scaleX: 0 });
    }

    if (store.isBot) {
      gsap.set(modalRef.value, { xPercent: 0, y: 0 });
      gsap.set(backdropRef.value, { autoAlpha: 1 });
      initialHideClass.value = "";
      if (heroTextRef.value && !heroSplit) {
        gsap.set(heroTextRef.value, { autoAlpha: 1 });
      }
      return;
    }

    gsap.set(modalRef.value, { xPercent: 100, y: 0 });
    gsap.set(backdropRef.value, { autoAlpha: 0 });

    initialHideClass.value = "";

    if (heroTextRef.value && !store.isBot) {
      heroSplit = new SplitText(heroTextRef.value, {
        type: "lines",
        mask: "lines",
      });
      heroSplit.lines.forEach((line: HTMLElement) => {
        const parent = line.parentElement;
        if (parent) {
          parent.style.overflow = "visible";
          parent.style.clipPath =
            "polygon(0% -20%, 100% -20%, 100% 115%, 0% 115%)";
        }
      });
      gsap.set(heroSplit.lines, { yPercent: 110, force3D: true });
    }

    gsap.to(backdropRef.value, {
      autoAlpha: 1,
      duration: 1.3,
      ease: "expo.inOut",
    });

    gsap.to(modalRef.value, {
      xPercent: 0,
      duration: 1.3,
      ease: "expo.inOut",
      force3D: true,
      onComplete: () => {
        gsap.set(modalRef.value, { clearProps: "transform" });
        ScrollTrigger.refresh();
      },
    });

    if (heroSplit) {
      gsap.to(heroSplit.lines, {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.7,
        force3D: true,
      });
    }
  } else {
    if (scrollWrapperRef.value) {
      scrollWrapperRef.value.style.pointerEvents = "none";
    }

    if (store.isBot || !store.isPreloaderDone) {
      isVisible.value = false;
      if (scrollWrapperRef.value) scrollWrapperRef.value.scrollTop = 0;
      Object.keys(errors.value).forEach(
        (k) => (errors.value[k as keyof typeof errors.value] = false),
      );
      return;
    }

    gsap.to(backdropRef.value, {
      autoAlpha: 0,
      duration: 1.1,
      ease: "expo.inOut",
    });

    gsap.to(modalRef.value, {
      xPercent: 100,
      duration: 1.1,
      ease: "expo.inOut",
      force3D: true,
      onComplete: () => {
        isVisible.value = false;
        initialHideClass.value = "opacity-0";

        if (scrollWrapperRef.value) {
          scrollWrapperRef.value.scrollTop = 0;
          scrollWrapperRef.value.style.pointerEvents = "auto";
        }

        if (heroSplit) {
          heroSplit.revert();
          heroSplit = null;
        }

        Object.keys(errors.value).forEach(
          (k) => (errors.value[k as keyof typeof errors.value] = false),
        );
      },
    });
  }
});

const closeModal = () => {
  const targetPath = route.path === "/contact" ? "/" : route.path;
  window.history.pushState(null, "", targetPath);
  store.closeContact();
};

onUnmounted(() => {
  if (heroSplit) heroSplit.revert();
  if (submitLineAnim) submitLineAnim.kill();
});
</script>
