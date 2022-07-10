/**************************************************************************
 *
 *  DLAP Bot: A Discord bot that plays local audio tracks.
 *  (C) Copyright 2022
 *  Programmed by Andrew Lee
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 ***************************************************************************/

import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { audio, audioArray, currentTrack, files, playerState } from '../AudioBackend.js';

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Checks what audio file is playing currently'),
  async execute(interaction, bot) {
    let audioID = currentTrack;
    audioID++;

    let audioName = audioArray[audioID];
    audioName = audioName.split('.').slice(0, -1).join('.');

    if (audioName == null) {
      audioName = 'Finish';
    }

    const controlEmbed = new MessageEmbed()
      .setAuthor({ name: `${bot.user.username} Status`, iconURL: bot.user.avatarURL() })
      .addField('State', playerState)
      .addField('Tracks', `${audioID}/${files.length}`)
      .addField('Currently Playing', audio)
      .addField('Up Next', audioName)
      .setColor('#0066ff');
    interaction.reply({ embeds: [controlEmbed], ephemeral: true });
  }
};
