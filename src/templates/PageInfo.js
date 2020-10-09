import React from 'react';


import Layout from "../components/Layout";


import WhatsAppIcon from '../../static/assets/icons/whatsapp.svg';
import bookIcon from '../../static/assets/icons/book2.svg'
import leftArrowIcon from '../../static/assets/icons/left-arrow.svg'
import campusPng from '../../static/assets/images/PonteTubarao/ponte.png'
import pontePng from '../../static/assets/images/campusTubarao/campus.png';
import handshakingIcon from '../../static/assets/icons/handshaking.svg'
import lightningIcon from '../../static/assets/icons/lightning.svg'
import rightArrowIcon from '../../static/assets/icons/right-arrow.svg'



const PageInfo = ()=>(
    <Layout>
        <section id="info">
        <article class="we-are-screen">
            <div class="whatsapp">
                <a href="https://api.whatsapp.com/send?l=pt&phone=5548984185640" rel="noopener" target="_blank"><img src={WhatsAppIcon} alt="WhatsApp"/></a>
            </div>
            <h2>Somos uma Empresa Júnior de Jovens Empreendedores.</h2>
        </article>
        <article class="about-us-screen">
            <div class="right-container">
                <div class="description">
                    <h3>SOBRE NÓS</h3>
                    <p>O Instituto Federal de de Santa Catarina tem gerado muitos valores dentre as instituições
                        públicas na região. O curso de Análise e Desenvolvimento de Sistemas reconhecido com
                        nota máxima pelo MEC tem agregado muito no desenvolvimento profissional dos acadêmicos.
                        Com muito empenho e dedicação nossa história começa nesta instituição, com intuito de
                        gerar mais aprendizado e crescimento profissional, nossa EJ em parceria com a
                        instituição procura agregar ainda mais no desempenho dos alunos, buscando reconhecimento
                        no mercado de software com entrega de soluções satisfatórias aos nossos clientes.</p>
                </div>
                <span><img src={leftArrowIcon}/></span>
                <img src={campusPng} alt="Campus Tubarão - 2015"/>
            </div>
            <div class="left-container">
                <img src={pontePng} alt="Ponte de Tubarão"/>
                <span><img src={rightArrowIcon}/></span>
                <div class="description">
                    <p>Como primeira Empresa Júnior no segmento de desenvolvimento na região, buscamos bons
                        significados sobre quem somos. Nossa inicial “Shark” lembra nossa origem remetendo ao
                        nome da cidade que estamos localizados, e nossa terminação “Code” simplifica ainda mais
                        nossa empolgação por tecnologia.</p>
                </div>
            </div>
        </article>
        <article class="pillars-screen">
            <div class="pillars">
                <h3>Nossos pilares</h3>
                <div id="first-pillar">
                    <div class="green-circle"><img src={handshakingIcon}/></div>
                    <p>Comprometimento - Nos comprometemos em trazer resultados e satisfação para os nossos
                        clientes.</p>
                </div>
                <div id="second-pillar">
                    <div class="green-circle"><img src={lightningIcon}/></div>
                    <p>Sinergia - Conectamos ideias e pensamentos da nossa equipe com os dos nossos cliente com
                        relações constantes e feedbacks rápidos.</p>
                </div>
                <div id="third-pillar">
                    <div class="green-circle"><img src={bookIcon}/></div>
                    <p>Aprendizado - Sempre estamos aprendendo para entregar soluções melhores e que tragam mais
                        resultado para os nossos cliente.</p>
                </div>
            </div>
            <div id="quote">
                <h4>“Entregamos projetos com qualidade e pensando sempre na sua experiência”</h4>
            </div>
        </article>
    </section>
  </Layout>
);

export default PageInfo;