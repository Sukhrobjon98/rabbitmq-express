"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = __importStar(require("amqplib"));
function producer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqp.connect("amqp://11111:11111@localhost:5672");
            const channel = yield connection.createChannel();
            let queue = "hello";
            let msg = "hello world";
            channel.assertQueue(queue, { durable: false });
            for (let i = 0; i < 1000; i++) {
                channel.sendToQueue(queue, Buffer.from(msg + i));
                console.log(" [x] Sent %s", msg);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
producer();
function recive() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqp.connect("amqp://11111:11111@localhost:5672");
            const channel = yield connection.createChannel();
            channel.prefetch(5);
            channel.consume("hello", (message) => {
                if (message !== null) {
                    setTimeout(() => {
                        channel.ack(message);
                    }, 2000);
                    console.log(message.content.toString());
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
recive();
