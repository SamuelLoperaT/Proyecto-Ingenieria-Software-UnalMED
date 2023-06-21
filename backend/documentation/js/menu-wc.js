'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GameModule.html" data-type="entity-link" >GameModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WsModule.html" data-type="entity-link" >WsModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiSocketGateway.html" data-type="entity-link" >ApiSocketGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Board.html" data-type="entity-link" >Board</a>
                            </li>
                            <li class="link">
                                <a href="classes/Box.html" data-type="entity-link" >Box</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoxType.html" data-type="entity-link" >BoxType</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientId.html" data-type="entity-link" >ClientId</a>
                            </li>
                            <li class="link">
                                <a href="classes/Color.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameApp.html" data-type="entity-link" >CreateGameApp</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameCommand.html" data-type="entity-link" >CreateGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameCommandHandler.html" data-type="entity-link" >CreateGameCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameGateway.html" data-type="entity-link" >CreateGameGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGameGatewayRequest.html" data-type="entity-link" >CreateGameGatewayRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CryptoUtils.html" data-type="entity-link" >CryptoUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dice.html" data-type="entity-link" >Dice</a>
                            </li>
                            <li class="link">
                                <a href="classes/DomainRoot.html" data-type="entity-link" >DomainRoot</a>
                            </li>
                            <li class="link">
                                <a href="classes/Game.html" data-type="entity-link" >Game</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameId.html" data-type="entity-link" >GameId</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameMessagesDataConfig.html" data-type="entity-link" >GameMessagesDataConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/GameStatus.html" data-type="entity-link" >GameStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdObject.html" data-type="entity-link" >IdObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Jail.html" data-type="entity-link" >Jail</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinGameApp.html" data-type="entity-link" >JoinGameApp</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinGameCommand.html" data-type="entity-link" >JoinGameCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinGameCommandHandler.html" data-type="entity-link" >JoinGameCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinGameGateway.html" data-type="entity-link" >JoinGameGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoinGameGatewayRequest.html" data-type="entity-link" >JoinGameGatewayRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Locate.html" data-type="entity-link" >Locate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocateId.html" data-type="entity-link" >LocateId</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocateType.html" data-type="entity-link" >LocateType</a>
                            </li>
                            <li class="link">
                                <a href="classes/Player.html" data-type="entity-link" >Player</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerId.html" data-type="entity-link" >PlayerId</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerStatus.html" data-type="entity-link" >PlayerStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sky.html" data-type="entity-link" >Sky</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringValueObject.html" data-type="entity-link" >StringValueObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tab.html" data-type="entity-link" >Tab</a>
                            </li>
                            <li class="link">
                                <a href="classes/WsExceptionFilter.html" data-type="entity-link" >WsExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/WsMainGateway.html" data-type="entity-link" >WsMainGateway</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CqrsBase.html" data-type="entity-link" >CqrsBase</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GeneralGuard.html" data-type="entity-link" >GeneralGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BoardDto.html" data-type="entity-link" >BoardDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BoxDto.html" data-type="entity-link" >BoxDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DiceDto.html" data-type="entity-link" >DiceDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameDto.html" data-type="entity-link" >GameDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWsRepository.html" data-type="entity-link" >IWsRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JailDto.html" data-type="entity-link" >JailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocateDto.html" data-type="entity-link" >LocateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerDto.html" data-type="entity-link" >PlayerDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabDto.html" data-type="entity-link" >TabDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});