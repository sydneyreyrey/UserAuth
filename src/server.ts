import "reflect-metadata";
import { StandUpApplication } from "./app";
import { Container } from "typedi";

const microServiceApp = Container.get(microServiceApp);
microServiceApp.listen();
